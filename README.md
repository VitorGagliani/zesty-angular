# 🍽️ Zesty — Sistema de Gestão para Restaurantes

O **Zesty** é um sistema completo para gerenciamento de pedidos em restaurantes, com foco em **automação, organização e agilidade no atendimento**.

O projeto simula um ambiente real, com fluxo de pedidos desde o cliente até a cozinha, incluindo acompanhamento em tempo real e dashboard gerencial.

---

## 🚀 Funcionalidades

### 👨‍🍳 Cozinha (KDS — Kitchen Display System)

* Visualização de pedidos por status:

  * 🟢 Aberto
  * 🟡 Em preparo
  * 🔵 Finalizado
* Atualização de status dos pedidos
* Organização por colunas (estilo iFood)
* Atualização dinâmica da tela

---

### 📊 Dashboard

* Produto mais pedido
* Total de pedidos do mês
* Total de pedidos do dia
* Pedidos em preparo
* Faturamento mensal
* Faturamento diário
* Atualização manual dos dados

---

### 🧾 Pedidos

* Criação de pedidos por mesa
* Associação de produtos
* Controle de quantidade e observações
* Fluxo de status do pedido

---

### 🪑 Mesas

* Cadastro de mesas
* Associação de pedidos às mesas

---

## 🛠️ Tecnologias utilizadas

### Frontend

* Angular
* Angular Material
* TypeScript
* SCSS

### Backend

* Java
* Spring Boot
* JPA / Hibernate

### Banco de Dados

* PostgreSQL

---

## 🧠 Arquitetura

* Separação em camadas (Controller, Service, Repository)
* Uso de DTOs para comunicação entre backend e frontend
* API REST
* Frontend standalone components (Angular moderno)

---

## 📸 Preview

*(adicione aqui prints do sistema depois — isso aumenta MUITO o valor do projeto)*

---

## ⚙️ Como rodar o projeto

### 🔧 Backend

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/zesty

# Entre no projeto
cd backend

# Rode a aplicação
./mvnw spring-boot:run
```

---

### 💻 Frontend

```bash
cd frontend

npm install

ng serve
```

Acesse em:

```
http://localhost:4200
```

---

## 📌 Próximas melhorias

* 🔄 WebSocket para atualização em tempo real
* 📊 Gráficos no dashboard
* 🔔 Notificações de novos pedidos
* 📱 Transformar em PWA (app instalável)
* 🛒 Sistema de carrinho completo
* 🔐 Autenticação de usuários

---

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido com foco em:

* Aprendizado prático de desenvolvimento full stack
* Simulação de sistema real de restaurante
* Aplicação de boas práticas de arquitetura

---

## 👨‍💻 Autor

Desenvolvido por **Vitor**

---

## ⭐ Considerações finais

O Zesty demonstra na prática a construção de um sistema completo, desde o backend até a interface, focando em usabilidade e performance.

Se você gostou do projeto, deixe uma ⭐ no repositório!
