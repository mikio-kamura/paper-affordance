import os
import sys

# --- 設定 ---
# リネーム後の拡張子を指定
EXTENSION = ".png"
# リネームするファイルの最大数
MAX_FILES_TO_RENAME = 60
# -----------------

# --- メインの処理 ---
if __name__ == '__main__':
    # コマンドライン引数をチェック
    if len(sys.argv) < 2:
        print("エラー: 対象のフォルダパスを引数として指定してください。")
        print("使い方: python your_script.py <フォルダのパス>")
        sys.exit(1)

    # 第一引数を対象ディレクトリとして取得
    target_dir = sys.argv[1]

    # ディレクトリが存在するか確認
    if not os.path.isdir(target_dir):
        print(f"エラー: 指定されたフォルダが見つかりません: {target_dir}")
        sys.exit(1)

    # このスクリプト自身のフルパスを取得
    script_path = os.path.abspath(__file__)

    # 指定されたディレクトリのアイテムをリストで取得
    try:
        all_items = os.listdir(target_dir)
    except FileNotFoundError:
        print(f"エラー: フォルダ '{target_dir}' が見つかりません。")
        sys.exit(1)

    # ファイルのみを抽出し、スクリプト自身と隠しファイルは除外する
    files_to_rename = []
    for filename in all_items:
        # 隠しファイル（"."で始まるファイル）をスキップ
        if filename.startswith('.'):
            continue

        full_path = os.path.join(target_dir, filename)
        # ファイルであり、かつ、このスクリプト自身ではない場合にリストに追加
        if os.path.isfile(full_path) and os.path.abspath(full_path) != script_path:
            files_to_rename.append(filename)

    # ファイル名を昇順でソート
    files_to_rename.sort()

    # 処理するファイルリストを最大数までに制限
    files_to_rename = files_to_rename[:MAX_FILES_TO_RENAME]

    if not files_to_rename:
        print(f"--- フォルダ '{target_dir}' 内にリネーム対象のファイルがありません ---")
        sys.exit(0)

    print(f"--- フォルダ '{target_dir}' 内の {len(files_to_rename)}個のファイルをリネームします ---")

    # ファイルを1から順番にリネーム
    for i, old_filename in enumerate(files_to_rename, start=1):
        # 新旧のフルパスを作成
        old_path = os.path.join(target_dir, old_filename)
        
        # 新しいファイル名を作成 (2桁のゼロ埋め)
        new_filename = f"{i:02d}{EXTENSION}"
        
        new_path = os.path.join(target_dir, new_filename)
        
        try:
            os.rename(old_path, new_path)
            print(f"'{old_filename}' -> '{new_filename}'")
        except OSError as e:
            print(f"エラー: '{old_filename}' のリネームに失敗しました。 {e}")

    print("--- 処理が完了しました ---")