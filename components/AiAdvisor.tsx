import React, { useState } from "react"
import { Send, SmartToy } from "@mui/icons-material"
import { CircularProgress, IconButton, TextField, Paper } from "@mui/material"

const AiAdvisor: React.FC = () => {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!query.trim()) return
    setLoading(true)
    setResponse("")
    try {
      // const result = await askStrategyAdvisor(query);
      // setResponse(result);
    } catch (e) {
      setResponse("Error connecting to advisor.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto h-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <SmartToy className="text-indigo-600" fontSize="large" />
        Strategy Advisor
      </h1>
      <p className="text-gray-500 mb-6">
        Ask our AI architect about the best branching strategy for your team.
      </p>

      <Paper
        elevation={3}
        className="flex-1 flex flex-col p-6 rounded-xl bg-white overflow-hidden"
      >
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
          {response ? (
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <h3 className="font-semibold text-indigo-800 mb-2">
                Advisor Recommendation:
              </h3>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                {response}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
              <SmartToy style={{ fontSize: 60 }} />
              <p className="mt-4">
                Ask me anything about GitFlow, Trunk-Based Development, etc.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-end gap-2 pt-4 border-t border-gray-100">
          <TextField
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            placeholder="e.g., When should I use Trunk Based Development?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleAsk()
              }
            }}
          />
          <div className="mb-1">
            <IconButton
              color="primary"
              onClick={handleAsk}
              disabled={loading || !query.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <Send />
              )}
            </IconButton>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default AiAdvisor

