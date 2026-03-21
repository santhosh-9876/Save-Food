# BiteShare - Food Donation Platform

A full-stack web application connecting food donors with those in need, reducing food waste and fighting hunger.

## 🌟 Features

- **User Authentication** - JWT-based secure login/registration
- **Food Donation** - Donors can post available food with expiry tracking
- **Food Claiming** - Users can claim food (1 per day limit)
- **Smart Restrictions** - Users cannot claim their own donations
- **Status Tracking** - Complete workflow from pending → approved → completed
- **Profile Management** - Track donations, claims, and received claims
- **Responsive Design** - Works seamlessly on mobile and desktop
- **Beautiful Animations** - AOS animations throughout

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Material-UI (MUI)
- React Router
- Axios
- AOS (Animate On Scroll)
- Bootstrap

### Backend
- Django 5.2.8
- Django REST Framework
- PostgreSQL
- JWT Authentication
- CORS Headers

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL

## 🚀 Installation

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend-drf
```

2. Create virtual environment:
```bash
python -m venv env
```

3. Activate virtual environment:
```bash
# Windows
env\Scripts\activate

# Linux/Mac
source env/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Configure PostgreSQL database in `SaveFood/settings.py`

6. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

7. Start backend server:
```bash
python manage.py runserver
```

Backend will run on `http://127.0.0.1:8000/`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend-react/SaveFood
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173/`

## 📱 Usage

1. **Register/Login** - Create an account or login
2. **Donate Food** - Go to Donor page and fill out the form
3. **Browse Food** - Check Available Food page
4. **Claim Food** - Click "Claim This Food" on any available item
5. **Manage** - View your donations and claims in My Profile

## 🔐 API Endpoints

### Authentication
- `POST /user/register/` - Register new user
- `POST /user/login/` - Login user
- `POST /user/token/refresh/` - Refresh JWT token

### Food
- `GET /food/donor/` - List all donations
- `POST /food/donor/` - Create donation
- `GET /food/donor/<id>/` - Get specific donation
- `PUT /food/donor/<id>/` - Update donation
- `DELETE /food/donor/<id>/` - Delete donation

### Claims
- `GET /food/claims/` - List all claims
- `GET /food/claims/?my_claims=true` - Get user's claims
- `POST /food/claims/` - Create claim
- `PUT /food/claims/<id>/` - Update claim status
- `DELETE /food/claims/<id>/` - Cancel claim

## 🎨 Design Features

- **Custom Fonts** - Righteous + Poppins combination
- **Color Scheme** - Green theme (#08775bff)
- **Animations** - Smooth AOS animations
- **Responsive** - Mobile-first design

## 👥 User Roles

### Donor
- Post food donations
- View received claims
- Approve/confirm pickups
- Mark as delivered

### Claimer
- Browse available food
- Claim food (1 per day)
- Mark as received
- View claim history

## 📝 Business Rules

- Users can claim only 1 food item per day
- Users cannot claim their own donations
- Food expires based on donor-set hours (1-5 hours)
- Claims go through: Pending → Approved → Completed

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Created by Escobar

## 🙏 Acknowledgments

- Material-UI for the component library
- Django REST Framework for the backend API
- AOS for beautiful animations

---

Made with ❤️ for a better world
