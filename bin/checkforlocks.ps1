# check for locks

$outputJson = './wwwroot/assets/data/output.json'
$stringBuilder = New-Object System.Text.StringBuilder
$PSDefaultParameterValues['Out-File:Encoding'] = 'UTF8'

# ##### modify $watchList with strings to match watched files and folders
# $watchList = "readme", "dave"
$watchListFile = ".\wwwroot\assets\data\watchlist.json"

$comma = ", "

Do {
    $stringBuilder.Clear()
    $stringBuilder.AppendLine("{")
    $iCnt = 0
    $watchlist =  Get-Content $watchListFile | ConvertFrom-Json
    $listLength = $watchList.watchlist.Count

    foreach ($item in $watchList.watchlist) {
        Write-Host -NoNewLine "`nChecking for locked files matching: ["$item"]`n`n"
        # For each item in the watch list check if any are opened and output to JSON format
        $matchOutput = Get-SmbOpenFile | Select-Object -Property Path, ClientUserName, ClientComputerName | Where-Object -Property Path -Match "$item" | ConvertTo-Json

        # If nothing is open for the watched item output JSON with none
        IF ($matchOutput -eq $null) {
            $matchOutput = "[{`n`t`"Path`": `"none`",`n`t`"ClientUserName`": `"none`",`n`t`"ClientComputerName`": `"none`"}]"
        }

        # Write-Host "`nmatchOutput: "($matchOutput[0] -ne $null) $matchOutput 
        $outputType = ConvertFrom-Json -InputObject $matchOutput
        if ($outputType -isnot [System.array]){
            Write-Host "`ntype: "$outputType.GetType() ($outputType -isnot [System.array])"`n"
            Write-Host "item: "$item"`n"
            $matchOutput = "[" + $matchOutput + "]"
            Write-Host "matchOutput: "$matchOutput"`n"
        }

        # If this is last item in watch list do not use a comma for the JSON output
        $iCnt = $iCnt + 1
        IF ($iCnt -lt $listLength)
        {$comma = ", "}
        ELSE
        {$comma = ""}

        $stringBuilder.AppendLine("`t`"" + $item + "`":" + $matchOutput + $comma)
    }
    $stringBuilder.AppendLine("}")

    $stringBuilder.ToString() | Out-File $outputJson
    # Write-Output $stringBuilder.ToString()
    Write-Host 'Wait...'

    Start-Sleep 10
} While ($TRUE)
