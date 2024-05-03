from flask import Flask, render_template, request
from transformers import AutoTokenizer, AutoModelForCausalLM, logging
import pandas as pd
import sys
import os

CSV_ALL_PATH = # 全体評価のevaluate_all.csvのパス
if len(sys.argv) == 4:
    MODEL_PATH1 = sys.argv[1]
    MODEL_PATH2 = sys.argv[2]
    CSV_PATH = sys.argv[3]
else:
    print("引数エラー")
    sys.exit(1)

app = Flask(__name__, static_folder='./public/static', template_folder='./public')

# 詳細レベルをERRORレベルに設定（警告は無視される）
logging.set_verbosity_error()

# トークナイザとモデルの読み込み
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH1, use_fast=False)
model = AutoModelForCausalLM.from_pretrained(MODEL_PATH2)

# 発話と応答の履歴を保存するリスト
utterance, response = [], []

# 応答の生成
def generate_response(text):
    # 応答の生成
    if text == '':
        return ''
    input_text = # 発話入力形式は非公開
    input_ids = tokenizer.encode(input_text, return_tensors='pt')
    output = model.generate(
        # 生成パラメータは非公開
    )
    # resパラメータはデコード後の応答

    return res

@app.route('/')
def index():
    # 発話と応答の履歴をクリア
    utterance.clear()
    response.clear()

    return render_template('index.html')

@app.route('/api/generate', methods=['POST'])
def api_generate():
    # 応答の生成
    text = request.json['text']
    res = generate_response(text)

    # 履歴の保存
    utterance.append(text)
    response.append(res)
    num = len(utterance)
    id = list(range(num))
    listen = [''] * num
    continuation = [''] * num
    df = pd.DataFrame(zip(id, utterance, response, listen, continuation), columns=['id', 'utterance', 'response', 'listen','continuation'])
    df.to_csv(CSV_PATH, index=False)

    return res

@app.route('/api/score', methods=['GET'])
def api_get_score():
    # csv読み込み
    df = pd.read_csv(CSV_PATH)

    return df.to_json(orient='records', force_ascii=False)

@app.route('/api/score', methods=['POST'])
def api_post_score():
    # 評価保存
    pd.DataFrame(request.json['data']).to_csv(CSV_PATH, index=False)

    # 全体評価保存
    name = os.path.splitext(os.path.basename(CSV_PATH))[0]
    all = request.json['all']
    if os.path.exists(CSV_ALL_PATH):
        df = pd.read_csv(CSV_ALL_PATH)
        if name in df['name'].to_list():
            df.loc[df['name'] == name, 'all'] = all
        else:
            df2 = pd.DataFrame([[name, all]], columns=['name', 'all'])
            df = pd.concat([df, df2])
        df.to_csv(CSV_ALL_PATH, index=False)
    else:
        pd.DataFrame([[name, all]], columns=['name', 'all']).to_csv(CSV_ALL_PATH, index=False)

    return 'ok'

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, use_reloader=False)
