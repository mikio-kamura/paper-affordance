import sys
import os
import glob
from PIL import Image

# --- 設定 ---
# クロップ後のアスペクト比 (高さ : 幅) を設定します
# 今回は「高さ3：幅4」なので、以下のように設定
ASPECT_HEIGHT = 3
ASPECT_WIDTH = 4.9 
ZURE_WIDTH = 80
# --- 設定 ---


def crop_to_aspect_ratio(input_dir, output_dir, aspect_h, aspect_w):
    """
    指定フォルダの全PNG画像を、指定のアスペクト比になるように左を残してクロップし、
    別フォルダに保存する。
    """
    # 1. 入力フォルダの存在をチェック
    if not os.path.isdir(input_dir):
        print(f"❌ エラー: 入力フォルダ '{input_dir}' が見つかりません。")
        return

    # 2. 出力用フォルダを作成（既にあれば何もしない）
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"📁 フォルダ '{output_dir}' を作成しました。")

    # 3. 入力フォルダ内のすべての.pngファイルのパスを取得
    search_path = os.path.join(input_dir, '*.png')
    image_paths = glob.glob(search_path)

    if not image_paths:
        print(f"❌ 入力フォルダ '{input_dir}' にPNG画像が見つかりませんでした。")
        return

    print(f"🖼️ {len(image_paths)}個のPNG画像を処理します...")

    # 4. 各画像をループで処理
    for input_path in image_paths:
        try:
            filename = os.path.basename(input_path)
            output_path = os.path.join(output_dir, filename)

            with Image.open(input_path) as img:
                original_width, original_height = img.size

                # 目標のアスペクト比から、現在の高さを基準にした目標の幅を計算
                target_width = int(original_height * aspect_w / aspect_h)

                # 元の幅が目標の幅より大きい場合のみクロップ処理を行う
                if original_width > target_width:
                    # クロップ領域を計算 (左, 上, 右, 下)
                    # 左を残すので、左上のx座標は0、右下のx座標は目標の幅
                    crop_area = (ZURE_WIDTH, 0, target_width+ZURE_WIDTH, original_height)
                    
                    cropped_img = img.crop(crop_area)
                    cropped_img.save(output_path)
                    print(f"  ✅ {filename} をクロップして保存しました。 (幅: {original_width} -> {target_width})")
                
                else:
                    # 元の幅が目標の幅以下の場合はクロップせず、そのままコピー
                    img.save(output_path)
                    print(f"  ℹ️  {filename} はクロップの必要がないため、そのままコピーしました。")

        except Exception as e:
            print(f"  ❌ {filename} の処理中にエラーが発生しました: {e}")

    print("\n🎉 すべての処理が完了しました！")


if __name__ == '__main__':
    # コマンドライン引数の数をチェック
    if len(sys.argv) != 3:
        print("❌ 引数が正しくありません。")
        print(f"使い方: python {os.path.basename(__file__)} <入力フォルダ名> <出力フォルダ名>")
        sys.exit(1)

    # 引数から入力・出力フォルダ名を取得
    input_folder = sys.argv[1]
    output_folder = sys.argv[2]

    # 処理を実行
    crop_to_aspect_ratio(input_folder, output_folder, ASPECT_HEIGHT, ASPECT_WIDTH)