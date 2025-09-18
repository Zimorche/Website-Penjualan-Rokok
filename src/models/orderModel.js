import db from "../db/db.js";


//Membuat Order Baru
export async function createOrder(customer_name,items){
    try{
        await db.query("BEGIN");

        const orderResult = await db.query("INSERT INTO orders (customer_name) VALUES ($1) RETURNING id;",[customer_name]);
        const orderId = orderResult.rows[0].id
    
    
        //Memasukkan Item kedalam
        for (let item of items){
            await db.query("INSERT INTO order_items (order_id,product_id,quantity) VALUES ($1,$2,$3);",[orderId,item.product_id,item.quantity]);
        }

        await db.query("COMMIT");
        return orderId;
    }
    catch(err){
        await db.query("ROLLBACK");
        throw err;
    }
};

//Menghapus Order
export async function deleteOrder(orderId){
    const result = await db.query("DELETE from orders WHERE id=($1) RETURNING *",[orderId]);
    return result.rows[0];
}


//Mengambil Semua Order
export async function getAllOrders() {
    const result = await db.query("SELECT * FROM orders ORDER BY id ASC");
    return result.rows;
}

//Mengambil Order Bersarkan Rentang Tanggal Tertentu
export async function getOrdersByDate(start,end){
    const result = await db.query("SELECT * FROM orders WHERE tanggal BETWEEN $1 AND $2 ORDER BY tanggal ASC;",[start,end]);
    return result.rows;
}

//Mengambil Total Harga Order
export async function getTotalPrice(orderId){
    const result = await db.query("SELECT o.id , o.customer_name , o.tanggal , SUM(oi.quantity * p.harga) as total_harga from orders o JOIN order_items oi ON o.id = oi.order_id JOIN product p ON oi.product_id = p.id WHERE o.id = ($1) GROUP BY o.id , o.customer_name , o.tanggal;",[orderId]);
    return result.rows[0];
}

