import { supabase } from "@/supabase/supabase.config";

export async function getComment(postId:number){
    try{
        const { data, error } = await supabase
        .from("Comment")
        .select("*")
        .eq("post_id",postId)

        if(error){console.log(error);}
        return data;
        
    }catch(error){
        console.log(error);
    }
    
}