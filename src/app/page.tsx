"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { saveUserToDatabase } from "@/features/saveUserToDatabase";
import Header from "@/components/Header";
import ToggleSwitch from "@/components/ToggleSwitch";

export default function Home() {

  const { user, isLoaded } = useUser(); // 🔹 ここで useUser() を正しく使う
  console.log(user)

  useEffect(() => {
    const savefunc = async ()=>{
      console.log("🟢 useEffect 実行！ユーザー情報:", user);
      if (isLoaded) {
        await saveUserToDatabase(user); // 🔹 `user` を渡す
      }
    }
    savefunc();
  }, [user,isLoaded]);
  return (
    <>
      <Header></Header>
      <ToggleSwitch></ToggleSwitch>
    </>
  );
}
