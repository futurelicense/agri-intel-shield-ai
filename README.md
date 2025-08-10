# 🌾 Agri-Intel Shield AI

![License](https://img.shields.io/badge/license-MIT-green)  
![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-✔-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.0-blue) ![API](https://img.shields.io/badge/Data%20Sources-Weather%2C%20Soil%2C%20Satellite-yellow)

> **AI-powered precision farming dashboard** is an intelligent farm management platform that provides real-time insights and analytics for agricultural operations. It combines data from weather services, satellite imagery, and soil databases with AI-driven analysis to help farmers and stakeholders monitor crop health, optimize resource usage, and mitigate risks. The goal of the project is to enhance decision-making on the farm – from daily irrigation and fertilization to long-term crop planning – through a unified dashboard that presents complex agronomic data in a clear, actionable format.

Key use cases include tracking a farm’s environmental conditions (like rainfall, temperature, and soil moisture), assessing vegetation health via satellite indices (NDVI/EVI), predicting yield trends, and receiving proactive recommendations for pest control or soil management. By integrating these features, Agri-Intel Shield AI empowers users to improve yields, reduce waste, and respond quickly to issues such as drought stress or pest outbreaks. The platform is designed for ease of use with interactive maps and charts, making advanced agricultural intelligence accessible even to users without a technical background. 

---

## 📚 Table of Contents
- [🚀 Overview](#-overview)
- [✨ Features](#-features)
- [🌐 Live Demo](#-live-demo)
- [🛠 Tech Stack](#-tech-stack)
- [🌎 Data Sources](#-data-sources)
- [⚙️ Installation](#️-installation)
- [📦 Deployment](#-deployment)
- [📊 Usage](#-usage)
- [🏗 Architecture](#-architecture)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🚀 Overview
Agri-Intel Shield AI is an **intelligent farm management platform** that:
- Tracks weather, soil health, and vegetation indices in real-time
- Predicts yield trends and pest/disease risks
- Provides **AI-driven recommendations** for farming actions
- Displays insights on an **interactive map and analytics dashboard**

The goal: **Increase yield, reduce waste, and improve decision-making** for farmers using advanced AI and remote sensing.

---

## ✨ Features
- 🌦 **Real-Time Weather Monitoring** (OpenWeather API)
- 🌱 **Soil Health Analytics** (pH, moisture, organic carbon)
- 🛰 **Satellite NDVI/EVI Tracking** (Sentinel Hub, NASA MODIS)
- 🐛 **Pest & Disease Risk Analysis**
- 🤖 **AI Recommendations** with priority levels
- 🗺 **Interactive Map View**
- 📈 **Performance Dashboard** with trend charts
- 💬 **AI Chatbot Assistant**
- 🔔 **Alerts & Notifications**

---

## 🌐 Live Demo
🔗 **[View Live on Lovable.dev](https://lovable.dev/projects/93ab4951-0a9f-41f2-b18e-7d3694e56db8)**

---

## 🛠 Tech Stack
**Frontend:** React + TypeScript + Vite  
**UI:** Tailwind CSS, shadcn/UI, lucide-react icons  
**Data APIs:** OpenWeatherMap, Sentinel Hub, NASA MODIS, SoilGrids, Google Maps  
**Charts:** Recharts  
**AI/NLP:** Hugging Face (planned), rule-based expert system  
**Hosting:** Lovable.dev / Vercel / Netlify

---

## 🌎 Data Sources
<details>
<summary>Click to expand data source details</summary>

- **OpenWeatherMap** → Weather & forecast  
- **Sentinel Hub** → NDVI from Sentinel-2  
- **NASA MODIS (MOD13Q1)** → NDVI/EVI time-series  
- **SoilGrids** → pH, organic carbon, nitrogen, moisture  
- **OpenStreetMap Nominatim** → Geocoding  
- **Google Maps API** → Map rendering, reverse geocoding  
- *(Optional)* Planet Labs, Google Earth Engine for advanced imagery

</details>

---

## ⚙️ Installation
```bash
# Clone repository
git clone https://github.com/drholaoluwa/agri-intel-shield-ai.git
cd agri-intel-shield-ai

# Install dependencies
npm install

# Create .env with your API keys
VITE_OPENWEATHER_KEY=xxxx
VITE_SENTINELHUB_CLIENT_ID=xxxx
VITE_SENTINELHUB_CLIENT_SECRET=xxxx
VITE_GOOGLE_MAPS_API_KEY=xxxx

# Run in development
npm run dev
