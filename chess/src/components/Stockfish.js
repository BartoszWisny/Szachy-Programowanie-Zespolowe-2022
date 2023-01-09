class Stockfish {
  constructor() {
    this.stockfish = new Worker("/stockfish.js")
    this.skillLevel = null
    this.depth = null
    this.movetime = null
    this.isAnalyzing = false
    this.engineStatus = {}
    this.bestMove = null

    this.stockfish.onmessage = (event) => {
      const line = event && typeof event === "object" ? event.data : event

      if (line === "uciok") {
        this.engineStatus.engineLoaded = true
      } else if (line === "readyok") {
        this.engineStatus.engineReady = true
      } else {
        const move = line.match("^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?")
      
        if (move) {
          this.bestMove = move[1] + " " + move[2] + " " + (move[3] ? move[3] : "")
          this.isAnalyzing = false
        }
      }
    }

    this.stockfish.postMessage("uci")
    this.stockfish.postMessage("isready")
    this.stockfish.postMessage("ucinewgame")
  }

  isEngineLoaded() {
    return this.engineStatus.engineLoaded
  }

  setFEN(fen) {
    if (this.engineStatus.engineLoaded) {
      this.stockfish.postMessage(`position fen ${fen}`)
    }
  }

  setDepth(depth) {
    this.depth = depth
  }

  setMoveTime(movetime) {
    this.movetime = movetime
  }

  setSkillLevel(skillLevel) {
    if (this.engineStatus.engineLoaded) {
      this.skillLevel = skillLevel
      this.stockfish.postMessage(`setoption name Skill Level value ${skillLevel}`)
    }
  }

  searchBestMoveDepth(fen) {
    this.bestMove = null
    this.isAnalyzing = true
    this.setFEN(fen)
    this.stockfish.postMessage(`go depth ${this.depth}`)
  }

  searchBestMoveMoveTime(fen) {
    this.bestMove = null
    this.isAnalyzing = true
    this.setFEN(fen)
    this.stockfish.postMessage(`go movetime ${this.movetime}`)
  }

  getBestMove() {
    return this.isAnalyzing ? null : this.bestMove
  }
}

export default Stockfish
