import { supabase } from "@/supabase/supabase.config";

export async function sentComment(
    comment:string,
    post_id:number,
    user_id:string,
    filePath:string
) {
    try{
        const { data: urlData } = await supabase
        .storage
        .from('Comment')
        .getPublicUrl(filePath);

        const imageUrl = urlData?.publicUrl;
        console.log("imageurl",imageUrl)

        const {data,error} = await supabase
        .from("Post")
        .insert({
            comment:comment,
            post_id:post_id,
            user_id:user_id,
            reply_image:filePath
        })
    }
    catch(error){
        console.log("insert error",error)
    }
}