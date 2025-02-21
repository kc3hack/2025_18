import { supabase } from "@/supabase/supabase.config";

export async function insertShare (
    user_id:string|null,
    sentpostid:number,
    receivepostid:number
){
    try{
        const {data,error} = await supabase
        .from("Share")
        .insert({
            user_id:user_id,
            sent_post_id:sentpostid,
            receive_post_id:receivepostid
        })
    }
    catch(error){
        console.log(error);
    }
}