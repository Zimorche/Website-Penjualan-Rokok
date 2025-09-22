import * as OrderModel from "../models/orderModel"; 

export async function getOrders(req,res){

    const orders = await OrderModel.getAllOrders();
    res.render()


}