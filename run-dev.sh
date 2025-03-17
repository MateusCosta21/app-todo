cp .env.example .env
if [ $? -ne 0 ]; then
    echo "Erro ao copiar o arquivo .env.example para .env. Abortando."
    exit 1
fi
echo "Subindo os containers do Docker..."
docker compose up -d --build
if [ $? -ne 0 ]; then
    echo "Erro ao subir os containers do Docker. Abortando."
    exit 1
fi
