import { supabase } from "@/supabase/supabase.config";

export async function sentComment(
    comment:string,
    post_id:number,
    user_id:string,
    filePath:string
) {
    console.log("投稿できてるー")
    try{
        const { data: urlData } = await supabase
        .storage
        .from('PostImage')
        .getPublicUrl(filePath);

        const imageUrl = urlData?.publicUrl;
        console.log("imageurl",imageUrl)

        const {data,error} = await supabase
        .from("Comment")
        .insert({
            comment:comment,
            post_id:post_id,
            user_id:user_id,
            reply_image:imageUrl
        })
        if (error){
            console.log(error);
        }
    }
    catch(error){
        console.log("insert error",error)
    }
}