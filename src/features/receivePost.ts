import { supabase } from "@/supabase/supabase.config";

export async function receivePost(kansai:boolean){
    try{
        const {data,error} = await supabase
        .from("Post")
        .select("*")
        .eq("judge",kansai);

        if(data){
            const randomindex = Math.floor(Math.random() * (data.length));
            const randomitem = data[randomindex];
            return randomitem;
        }
    }
    catch(error){
        console.log(error);
    }
}