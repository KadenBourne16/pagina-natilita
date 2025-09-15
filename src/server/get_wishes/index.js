"use server"
import { client } from "@/sanity/lib/client";

export const GetWishess = async() => {
    try {
        const fetched_wishes = await client.fetch("*[_type == 'wish_message']")
        if(fetched_wishes){
            return {
                type : "success",
                success: true,
                message: "Successfully fetched data",
                data: fetched_wishes
            }
         }

         return({
            type: "fail",
            success: false,
            message: "Failed to fetch data"
         })
    } catch (error) {
     console.error(error)   
     return({
        type: "error",
        success: false,
        message: "Failed to fetch data"
     })
    } 
}