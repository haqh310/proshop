from base.views import order_views as views
from django.urls import path

urlpatterns = [
    path('', views.getOrders, name='list_odrer'),

    path('add/', views.addOrderItems, name='add_item'),
    path('myorders/', views.getMyOrders, name='my_orders'),
    path('<str:pk>/', views.getOrderById, name='get_order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='update_pay'),
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='update_delivered'),
]