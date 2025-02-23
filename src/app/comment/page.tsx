'use client';
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/supabase/supabase.config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { sentComment } from "@/features/sentComment";
import { getDbUserId } from "@/features/getUserId";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Comment(){
    const [filePath, setFilePath] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [comment, setComment] = useState<string>("");
    const [userId, setUserId] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const postId = Number(searchParams.get("postId"));

    const router = useRouter();
    const toastShown = useRef(false); // トースト表示済みかどうかを管理

    useEffect(() => {
        const fetchId = async () => {
          const id = await getDbUserId();
          if (id) {
            setUserId(id);
          }
        };
        fetchId();

        // まだ表示していなければ、トーストを表示
        if (!toastShown.current) {
            toast("1投稿につき1コメントのみ可能です", { duration: 2000 });
            toastShown.current = true;
        }
    }, []);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
          return;
        }
    
        const file = event.target.files[0];
        const newFilePath = `replyimage/${userId}/${encodeURIComponent(file.name)}`;
        console.log(newFilePath);
        const { error } = await supabase.storage
          .from("PostImage")
          .upload(newFilePath, file);
        if (error) {
          console.error("画像のアップロードエラー:", error);
          return;
        }
        setFilePath(newFilePath);
        setImage(file);
    };

    const handlePost = async (event: React.FormEvent) => {
        event.preventDefault();
    
        if (comment !== "" && filePath && userId !== null){
            sentComment(comment, postId, userId, filePath);
            toast.success('送信完了！！', { removeDelay: 2000 });
            router.push("/");
        } else {
            toast.error("すべて入力してください");
        }
    };
    
  return (
        <div className="w-[370px] p-3 rounded-[20px] mx-auto my-[10%]">
          <form className="space-y-4">
  
            {/* 画像アップロード */}
            <div>
              <label
                htmlFor="photo"
                className="block text-[14px] mb-2 font-bold text-[#9D7858]"
              >
                写真
              </label>
              <div
                className="w-[341px] h-[20px] border p-5 text-center cursor-pointer rounded-[18px] border-[#9D7858] text-[#9D7858] font-bold text-[14px] flex items-center justify-center"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                写真のアップロード
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
  
              {/* プレビュー */}
              {image && (
                <div className="mt-4 relative w-full">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="max-h-[200px] mx-auto object-contain rounded-md border shadow-md"
                    width={300}
                    height={200}
                  />
                </div>
              )}
            </div>
  
            {/* コメント */}
            <div>
              <label
                htmlFor="comment"
                className="block text-[14px] mb-2 font-bold text-[#9D7858] border-[#9D7858]"
              >
                コメント
              </label>
              <input
                type="text"
                onChange={(e) => setComment(e.target.value)}
                className="w-[340px] h-[100px] border p-2 min-h-[95px] rounded-[18px] border-[#9D7858]"
              />
            </div>
            {/* 送信ボタン */}
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-[178px] h-[50px] mx-auto bg-[#E8CF8F] text-white text-[24px] font-bold rounded-full"
                onClick={handlePost}
              >
                送信
              </button>
            </div>
          </form>
        </div>
  );
}
