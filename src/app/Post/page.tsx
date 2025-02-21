"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getDbUserId } from "@/features/getUserId";
import { sentPost } from "@/features/sentPost";
import { supabase } from "@/supabase/supabase.config";
import { insertShare } from "@/features/insertShare";
import { receivePost } from "@/features/receivePost";
import { useRouter } from "next/navigation";

let map: google.maps.Map;
let geocoder: google.maps.Geocoder;
let marker: google.maps.Marker;

function initMap(setMapUrl: React.Dispatch<React.SetStateAction<string>>) {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 35.6895, lng: 139.6917 }, // 東京
    zoom: 15,
    gestureHandling: "greedy", // スマホ操作を最適化
  });

  geocoder = new google.maps.Geocoder();
  marker = new google.maps.Marker({ map: map });

  // 検索ボックスの設定
  const input = document.getElementById("search-box") as HTMLInputElement;
  if (input) {
    const searchBox = new google.maps.places.SearchBox(input);

    // マップ範囲を検索ボックスに反映
    map.addListener("bounds_changed", () => {
      const bounds = map.getBounds();
      if (bounds) {
        searchBox.setBounds(bounds);
      }
    });

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (!places || places.length === 0) return;

      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (place.geometry && place.geometry.location) {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }

  // タップで住所取得
  map.addListener("click", (event: google.maps.MapMouseEvent) => {
    const latlng = event.latLng;
    if (latlng) {
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const fulladdress = results[0].formatted_address;
          const address = fulladdress.replace(/^日本、〒\d{3}-\d{4} /, "");
          const fullMapUrl = `http://local.google.co.jp/maps?q=${encodeURIComponent(address)}`;
          setMapUrl(fullMapUrl);
          console.log(fullMapUrl);
          marker.setPosition(latlng);
        } else {
          alert("住所を取得できませんでした。");
        }
      });
    }
  });
}

export default function Post() {
  const [image, setImage] = useState<File | null>(null);
  const [filePath, setFilePath] = useState<string>(""); // 画像URLの状態を追加
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [judge, setJudge] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mapUrl, setMapUrl] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchId = async () => {
      const id = await getDbUserId();
      if (id) {
        setUserId(id);
      }
    };

    // Google Maps APIのスクリプトを読み込む
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initMap(setMapUrl); // API読み込み後に地図を初期化、setMapUrlを渡す
      fetchId(); // ユーザーIDの取得
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return; // 画像が選択されていない場合
    }

    const file = event.target.files[0];
    const newFilePath = `postimage/${encodeURIComponent(file.name)}`;
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

  const handlePost = async () => {
    setLoading(true);
    const detailpost = await receivePost(!judge);
    const sent_post_id = await sentPost(title, text, filePath, judge, mapUrl, userId);
    const receive_post_id = detailpost.id;
    insertShare(userId, sent_post_id, receive_post_id);
    setLoading(false);
    router.push("/")
  };

  return (
    <div>
      {loading ? (
        <p>loading</p>
      ) : (
        <div className="w-[370px] p-3 rounded-[20px] mx-auto my-[10%]">
           <form className='space-y-4'>
           {/* タイトル */}
            <div>
              <label
                htmlFor='title'
                className='block text-[#9D7858] text-[24px] mb-2 font-bold'
              >
                タイトル
              </label>
              <input
                type="text"
                placeholder="タイトルを入力"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>


            {/* 画像アップロード */}
            <div>
              <label
              htmlFor='photo'
              className='block text-[14px] mb-2 font-bold text-[#9D7858]'
              >
              写真
              </label>
              <input type="file" accept="image/*" onChange={handleImageChange} />


              {/* プレビュー */}
              {image && (
                <div className="mt-4 relative w-full">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="max-h-[200px] mx-auto object-contain rounded-md border shadow-md"
                    width={300} //width,heightの指定が必須
                    height={200} 
                  />
                </div>
              )}
            </div>

            {/* boolを切り替えるボタン */}
            <button onClick={() => setJudge(!judge)}>
              {judge ? "ON (true)" : "OFF (false)"}
            </button>

            {/* 検索ボックス */}
            <input
              id="search-box"
              type="text"
              placeholder="場所を検索"
              style={{ margin: "10px 0", width: "100%" }}
            />

            {/* Google Map */}
            <div id="map" className="w-4/5 mx-auto h-80 md:h-96 lg:h-[500px]"></div>

            {/* テキスト入力 */}
            <div>
              <label
              htmlFor='comment'
              className='block text-[14px] mb-2 font-bold text-[#9D7858]'
              >
              コメント
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-[340px] h-[100px] border p-2 min-h-[95px] rounded-[18px]"
              />
            </div>
            

            {/* 送信ボタン */}
            <div className="flex justify-center items-center">
              <button
                className='w-[178px] h-[50px] mx-auto bg-[#E8CF8F] text-white  text-[24px] font-bold rounded-full'
                onClick={handlePost}>
                  送信
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
