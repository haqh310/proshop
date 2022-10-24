from base.views import product_views as views
from django.urls import path

urlpatterns = [
    path('', views.getProducts, name="list_product"),
    path('top/', views.getTopProducts, name="top_product"),
    path('upload/', views.uploadFile, name="upload_file"),
    path('create/', views.createProduct, name="product-create"),

    path('<str:pk>/', views.getProduct, name="get_product"),
    path('<str:pk>/reviews/', views.createProductReview, name="reviews"),


    path('update/<str:pk>', views.updateProduct, name="update_product"),
    path('delete/<str:pk>', views.deleteProduct, name="delete_product"),
]
