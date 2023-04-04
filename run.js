const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const system32 = 'C:\\Windows\\System32';
const taskKillPath = path.join(system32, 'taskkill.exe') + ' ';

const getStrPath = (str, regexp, ...points) => str.match(regexp)?.at(0)?.slice(...points);

const getPartOfDateStr = (dateStr, ...points) => dateStr.slice(...points);

const getActualLogFilePath = date => path.join(__dirname, 'logs', `MsInfo32Kill_${date}.txt`);

function kill(args) {
    exec(taskKillPath + args,
        (err, stdout, stderr) => {
            const pid = getStrPath(stdout, /\d{2,5},/, 0, -1);
            if (!pid) return;

            const procName = getStrPath(args, /"\w+\.exe"/, 1, -1);
            const dateStr = new Date(Date.now() + 18000000).toJSON();
            const killReportStr = `[${getPartOfDateStr(dateStr, 11, -5)}] ${procName} PID ${pid} was killed`;
            console.log(killReportStr);
            fs.appendFile(
                getActualLogFilePath(getPartOfDateStr(dateStr, 0, 10)),
                `${killReportStr}\r\n`, err => { if (err) { console.log(err); } }
            );
        });
}

setInterval(() => {
    kill('/F /FI "MEMUSAGE gt 4000" /IM "msinfo32.exe"');
    // kill('/F /FI "USERNAME eq NETWORK SERVICE" /FI "MEMUSAGE gt 10000" /IM "WmiPrvSE.exe" /T');
}, 5000);