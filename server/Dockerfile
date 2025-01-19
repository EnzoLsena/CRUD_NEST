# Usa a imagem do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do backend
COPY . .

# Compila o TypeScript (se necessário)
RUN npm run build

# Expõe a porta usada pelo NestJS
EXPOSE 3000

# Define o comando de inicialização
CMD ["npm", "run", "start"]
