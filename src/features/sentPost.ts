import { supabase } from "@/supabase/supabase.config";

export async function sentPost(
    filePath:string,
    title:string,
    text:string|null,
    judge:boolean,
    mapurl:string,
    mapname:string,
    user_id:string|null
) {
    try{
        const { data: urlData } = await supabase
        .storage
        .from('PostImage')
        .getPublicUrl(filePath);

        const imageUrl = urlData?.publicUrl;
        console.log("imageurl",imageUrl)

        const {data,error} = await supabase
        .from("Post")
        .insert({
            title:title,
            text:text,
            image:imageUrl,
            judge:judge,
            mapurl:mapurl,
            mapname:mapname,
            user_id:user_id
        })
        .select("id")
        .single()
        if(error){console.log(error)}
        return data?.id
    }
    catch(error){
        console.log("insert error",error)
    }
}