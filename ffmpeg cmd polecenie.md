# Do CMD w Windowsie
#### Jeśli chcesz zrobić plik .bat, to podwój wszystkie znaki "%"

## ⚠️ **WAŻNE** Musisz uruchomić CMD w ścieżce z filmami .wmv
## ⚠️ **WAŻNE** Musisz korzystać z znaków "\\" zamiast "/"

## 1. Jeśli konwertujesz pierwszy raz

#### Oczywiście zamień "C:\Ścieżka do FOLDERU z mp4" na twoją własną ścieżkę, gdzie masz folder

### a. Jeśli masz dość nową kartę graficzną Nvidia:

```bat
for %i in (*.wmv) do ffmpeg -i "%i" -c:v h264_nvenc "C:\Ścieżka do FOLDERU z mp4\%~ni.mp4"
```

### b. Jeśli masz dość nową kartę graficzną AMD lub zintegrowaną kartę graficzną AMD:

```bat
for %i in (*.wmv) do ffmpeg -i "%i" -c:v h264_amf "C:\Ścieżka do FOLDERU z mp4\%~ni.mp4"
```

### c. Jeśli masz kartę graficzną Intel lub zintegrowaną:

```bat
for %i in (*.wmv) do ffmpeg -i "%i" -c:v h264_qsv "C:\Ścieżka do FOLDERU z mp4\%~ni.mp4"
```

### d. (Najwolniejsza opcja) Jeśli nie masz ŻADNEGO z powyższych (może trwać ponad godzinę, zależnie od procesora):

```bat
for %i in (*.wmv) do ffmpeg -i "%i" -c:v libx264 "C:\Ścieżka do FOLDERU z mp4\%~ni.mp4"
```

## 2. Jeśli chcesz zaktualizować swoje filmy

#### Oczywiście zamień "C:\Ścieżka do FOLDERU z mp4" na twoją własną ścieżkę, gdzie masz folder

### a. Jeśli masz dość nową kartę graficzną Nvidia:

```bat
for %i in (*.wmv) do (
    if not exist "C:\Ścieżka do FOLDERU z mp4\%~ni.mp4" (
        ffmpeg -i "%i" -c:v h264_nvenc "C:\Ścieżka do FOLDERU z mp4\%~ni.mp4"
    )
)
```

### b. Jeśli masz dość nową kartę graficzną AMD lub zintegrowaną kartę graficzną AMD:

```bat
for %i in (*.wmv) do (
    if not exist "C:\Ścieżka do FOLDERU z mp4\%~ni.mp4" (
        ffmpeg -i "%i" -c:v h264_amf "C:\Ścieżka do FOLDERU z mp4\%~ni.mp4"
    )
)
```

### c. Jeśli masz kartę graficzną Intel lub zintegrowaną:

```bat
for %i in (*.wmv) do (
    if not exist "C:\Ścieżka do FOLDERU z mp4\%~ni.mp4" (
        ffmpeg -i "%i" -c:v h264_qsv "C:\Ścieżka do FOLDERU z mp4\%~ni.mp4"
    )
)
```

### d. (Najwolniejsza opcja) Jeśli nie masz ŻADNEGO z powyższych (może trwać ponad godzinę, zależnie od procesora):

```bat
for %i in (*.wmv) do (
    if not exist "C:\Ścieżka do FOLDERU z mp4\%~ni.mp4" (
        ffmpeg -i "%i" -c:v libx264 "C:\Ścieżka do FOLDERU z mp4\%~ni.mp4"
    )
)
```