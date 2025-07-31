import cv2
import os
import sys

# --- 設定項目 ---
# ここで何コマごとに画像を保存するか設定します（例: 2なら2コマごと）
FRAME_INTERVAL = 3

def video_to_frames(video_path, output_dir, interval):
    """
    動画を読み込み、指定された間隔でフレームを画像として保存する関数。
    """
    # 出力ディレクトリが存在しない場合は作成
    os.makedirs(output_dir, exist_ok=True)

    # 動画ファイルをキャプチャ
    cap = cv2.VideoCapture(video_path)

    # 動画が正常に開けたか確認
    if not cap.isOpened():
        print(f"エラー: 動画ファイルが開けませんでした。パスを確認してください: {video_path}")
        return

    # フレームを1枚ずつ読み込み、画像として保存
    frame_count = 0
    saved_count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 指定された間隔のフレームのみ保存
        if frame_count % interval == 0:
            # ゼロ埋めしたファイル名で出力パスを生成 (例: 0000.png, 0002.png)
            output_path = os.path.join(output_dir, f"{saved_count:02d}.png")
            cv2.imwrite(output_path, frame)
            saved_count += 1

        frame_count += 1

    cap.release()
    print(f"✅ 処理が完了しました。{saved_count} 個のフレームを '{output_dir}' に保存しました。")


if __name__ == '__main__':
    # コマンドライン引数の数をチェック
    if len(sys.argv) < 2:
        print("エラー: 処理対象の動画ファイルパスを引数として指定してください。")
        print("使い方: python your_script_name.py <動画ファイルのパス> [出力フォルダ名]")
        sys.exit(1) # エラーで終了

    # 第一引数を動画パスとして取得
    input_video_path = sys.argv[1]

    # 第二引数が出力フォルダ名。指定されていなければ'output_frames'をデフォルト値とする
    output_folder = sys.argv[2] if len(sys.argv) > 2 else 'output_frames'

    # 関数を実行
    video_to_frames(input_video_path, output_folder, FRAME_INTERVAL)