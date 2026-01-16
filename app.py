# Random FireRed Pokémon Flask Backend
# Name - ADITYA BHARDWAJ
# Section - D2
# Roll No - 08
# Course – B TECH
# Branch – CSE

from flask import Flask, jsonify, render_template
import pandas as pd
from description import POKEDEX_DESCRIPTIONS

app = Flask(__name__)

pokemonData = pd.read_excel(
    r"C:\Users\Admin\Desktop\pokemon_flask\Gen1_FireRed_Types.xlsx"
)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/random")
def random_pokemon():
    row = pokemonData.sample(1).iloc[0]
    dex = int(row["Dex No"])
    name = row["Pokemon"]

    return jsonify({
        "dex": dex,
        "name": name,
        "description": POKEDEX_DESCRIPTIONS.get(dex),
        "sprite": f"/static/Front/{dex}.png",
        "cry": f"/static/sound/{dex}.wav"
    })


@app.route("/pokemon/<query>")
def get_pokemon(query):
    if query.isdigit():
        dex = int(query)
        row = pokemonData[pokemonData["Dex No"] == dex]
    else:
        row = pokemonData[pokemonData["Pokemon"].str.lower() == query.lower()]

    if row.empty:
        return jsonify({"error": "Pokemon not found"}), 404

    row = row.iloc[0]
    dex = int(row["Dex No"])
    name = row["Pokemon"]

    return jsonify({
        "dex": dex,
        "name": name,
        "description": POKEDEX_DESCRIPTIONS.get(dex),
        "sprite": f"/static/Front/{dex}.png",
        "cry": f"/static/sound/{dex}.wav"
    })


if __name__ == "__main__":
    app.run(debug=True)
