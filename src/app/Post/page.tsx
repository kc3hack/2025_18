"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { getDbUserId } from "@/features/getUserId";
import { sentPost } from "@/features/sentPost";
import { supabase } from "@/supabase/supabase.config";

export default function Post() {
  const [image, setImage] = useState<File | null>(null);
  const [filePath, setfilePath] = useState<string>(""); // 画像URLの状態を追加
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [judge, setJudge] = useState<boolean>(true);
  const [userId, setUserId] = useState<string|null>(null);
  const [loading,setloading] = useState<boolean>(false);


  useEffect(()=>{
    const fetchid = async()=>{
        const id = await getDbUserId();
        if (id){
            setUserId(id);
        }
    };
    fetchid();
  },[]);

  const handleFileChange = (e: any) => {
    if (e.target.files.length !== 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return; // 画像が選択されていない場合
    }

    const file = event.target.files[0]; // 選択された画像を取得
    const filePath = `${encodeURIComponent(file.name)}`; // 保存先のpathを指定
    const { error } = await supabase.storage
      .from("PostImage") // 使用するSupabaseのストレージバケット名
      .upload(filePath, file);

    if (error) {
      console.error("画像のアップロードエラー:", error);
      return;
    }
  };

  const handlePost = () => {
    sentPost(title, text, filePath, judge, 1, 1,userId); // 画像URLを渡して投稿
    console.log("imageUrl");
  };
return (
    <div>
      {loading?(
        <p>loading</p>
      ):(
      <>
        {/* タイトル入力 */}
        <input
          type="text"
          placeholder="タイトルを入力"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* テキスト入力 */}
        <input
          type="text"
          placeholder="テキストを入力"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* 画像アップロード */}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* プレビュー */}
        {image && (
          <div>
            <p>選択した画像:</p>
            <Image
              src={URL.createObjectURL(image)}
              alt="Preview"
              width={200}
              height={200}
            />
          </div>
        )}

        {/* boolを切り替えるボタン */}
        <button onClick={() => setJudge(!judge)}>
          {judge ? "ON (true)" : "OFF (false)"}
        </button>

        {/* 送信ボタン */}
        <button onClick={handlePost}>送信</button>
      </>
      )}
    </div>
  );
}
