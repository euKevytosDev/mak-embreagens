#!/usr/bin/env bash
# Regenera o story MacBook + iPhone a partir das duas gravações na pasta.
set -euo pipefail
cd "$(dirname "$0")"
WEB=$(ls -1 *12.00*.mov 2>/dev/null | head -1)
MOB=$(ls -1 *12.16*.mov 2>/dev/null | head -1)
echo "WEB=$WEB"
echo "MOB=$MOB"
echo "Use o comando no histórico do agente ou peça para regenerar."
