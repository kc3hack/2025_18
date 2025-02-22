"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { saveUserToDatabase } from "@/features/sageUserToDatabase";
import Image from "next/image";
import Header from "@/components/Header";
import ToggleSwitch from "@/components/ToggleSwitch";
import toast from "react-hot-toast";

export default function Home() {

  const { user } = useUser(); // 🔹 ここで useUser() を正しく使う
  console.log(user)

  useEffect(() => {
    console.log("🟢 useEffect 実行！ユーザー情報:", user);
    if (user) {
      saveUserToDatabase(user); // 🔹 `user` を渡す
    }
  }, []);
  return (
    <>
      <Header></Header>
      <ToggleSwitch></ToggleSwitch>
    </>
  );
}
