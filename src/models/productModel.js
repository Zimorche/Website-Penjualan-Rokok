import db from "../db/db.js";


//Mengambail Semua Produk
export async function getAllProduct(){
    const result = await db.query("SELECT * FROM product;");
    return result.rows;
}

//Mengambil produk berdasarkan ID
export async function getProductById(id){
    const result = await db.query("SELECT * FROM product WHERE id = ($1);",[id]);
    if(!result.rows[0]){
        return null
    }
    return result.rows[0];
}

//Mengupdate Produk
export async function updateProduct(id,name,price){
    const result = await db.query("UPDATE product SET name = ($1), price = ($2) WHERE id = ($3) RETURNING *;",[name,price,id]);
    return result.rows[0];
}

//Menghapus Produk
export async function deleteProduct(id) {
    const result = await db.query("DELETE FROM product WHERE id = ($1) RETURNING *;",[id]);
    return result.rows[0];
    
}