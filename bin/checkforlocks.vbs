'check for locks
dim serverName
dim number_of_open_files

' ###################### change to watched serverName
serverName = "tern8"
number_of_open_files = 0

Set objConnection = GetObject("WinNT://" & serverName & "/LanmanServer")
Set colResources = objConnection.Resources
Set watchList = CreateObject("System.Collections.ArrayList")
Set outputLines = CreateObject("System.Collections.ArrayList")
Set otherLines = CreateObject("System.Collections.ArrayList")

' ###################### add items to watch list
watchList.Add "item one"

' on error resume next

' colResources.Sort()
' Wscript.echo colResources

For Each item in watchList
    Wscript.echo "....." & item
    For Each objResource in colResources
        Wscript.echo "..." & objResource.Path

        if instr(objResource.Path, item) then
            outputLines.Add """" & objResource.User & """, """ & mid(objResource.Path, 26) & """" & vbCrLf

            number_of_open_files = number_of_open_files + 1
        end if
    next
Next

outputLines.Sort()

For Each outputLine in outputLines
    Wscript.Echo outputLine
Next

if number_of_open_files = 0 then
  Wscript.Echo """No open files"""
else
  Wscript.Echo  """" & number_of_open_files & " open file(s)"""
end if

number_of_open_files = 0

outputLines.Sort()
For Each otherLine in otherLines
    Wscript.Echo otherLine
Next
