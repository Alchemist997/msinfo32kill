TASKKILL /F /FI "MEMUSAGE gt 20000" /IM "msinfo32.exe"
TASKKILL /F /FI "USERNAME eq NETWORK SERVICE" /FI "MEMUSAGE gt 8000" /IM "WmiPrvSE.exe" /T
pause