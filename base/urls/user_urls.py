from base.views import user_views as views
from django.urls import path

urlpatterns = [
    path('', views.getUsers, name='users'),
    path('profile/', views.getUserProfile, name='user_profile'),
    path('profile/update/', views.updateUserProfile, name='update_profile'),
    path('login/', views.MyTokenObtainPairView.as_view(), name="token_obtain_pair_view"),
    path('register/', views.registerUser, name="register_user"),
    path('delete/<str:pk>', views.deleteUser, name="delete_user"),
    path('<str:pk>', views.getUserById, name="get_user"),
    path('update/<str:pk>', views.updateUserById, name="update_user"),
]