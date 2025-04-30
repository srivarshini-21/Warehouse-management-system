import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaShippingFast, FaCheckCircle, FaCalendarAlt, FaTruck } from 'react-icons/fa';

const LogisticsPage = () => {
    const navigate = useNavigate();

    // Sample orders data
    const [orders, setOrders] = useState([
        {
            id: 1,
            farmer: "John Doe Farms",
            products: [
                { name: "Organic Wheat", quantity: "50kg" },
                { name: "Basmati Rice", quantity: "30kg" }
            ],
            orderDate: "2023-05-01",
            estimatedDelivery: "2023-05-10",
            carrier: "FastTrack Logistics",
            trackingNumber: "FTL123456789",
            status: "ordered", // ordered → packed → shipped → delivered
            timeline: {
                ordered: "2023-05-01T10:00",
                packed: null,
                shipped: null,
                delivered: null
            }
        },
        {
            id: 2,
            farmer: "Green Valley Produce",
            products: [
                { name: "Sweet Corn", quantity: "100kg" },
                { name: "Tomatoes", quantity: "25kg" }
            ],
            orderDate: "2023-05-02",
            estimatedDelivery: "2023-05-11",
            carrier: "QuickShip Express",
            trackingNumber: "QSE987654321",
            status: "packed",
            timeline: {
                ordered: "2023-05-02T09:30",
                packed: "2023-05-03T14:15",
                shipped: null,
                delivered: null
            }
        }
    ]);

    // Update order status
    const updateStatus = (orderId, newStatus) => {
        setOrders(orders.map(order => {
            if (order.id === orderId) {
                const updatedTimeline = { ...order.timeline };
                updatedTimeline[newStatus] = new Date().toISOString();

                return {
                    ...order,
                    status: newStatus,
                    timeline: updatedTimeline
                };
            }
            return order;
        }));
    };

    // Status configuration
    const statusConfig = {
        ordered: { label: "Ordered", icon: <FaBox />, color: "bg-blue-500" },
        packed: { label: "Packed", icon: <FaBox />, color: "bg-yellow-500" },
        shipped: { label: "Shipped", icon: <FaShippingFast />, color: "bg-purple-500" },
        delivered: { label: "Delivered", icon: <FaCheckCircle />, color: "bg-green-500" }
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "Not yet";
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="logistics-container">
            {/* Back to Home Button */}
            <button
                onClick={() => navigate('/')}
                className="back-button"
            >
                ← Back to Home
            </button>

            <h1 className="logistics-header">Order Tracking Dashboard</h1>

            <div>
                {orders.map(order => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <div>
                                <h2>Order #{order.id}</h2>
                                <p>Farmer: {order.farmer}</p>
                            </div>
                            <div>
                                <p>Estimated Delivery: {order.estimatedDelivery}</p>
                                <p>{order.carrier} (Tracking: {order.trackingNumber})</p>
                            </div>
                        </div>

                        {/* Order Products */}
                        <div className="order-products">
                            <h3>Products:</h3>
                            <ul>
                                {order.products.map((product, index) => (
                                    <li key={index}>
                                        {product.name} - {product.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Timeline */}
                        <div className="timeline">
                            {Object.entries(statusConfig).map(([statusKey, status]) => {
                                const isCompleted = order.timeline[statusKey] !== null;
                                const isCurrent = order.status === statusKey;

                                return (
                                    <div key={statusKey} className="timeline-item">
                                        <div
                                            className={`timeline-icon ${statusKey} ${
                                                isCompleted ? statusKey : 'bg-gray-300'
                                            }`}
                                        >
                                            {status.icon}
                                        </div>
                                        <div className="timeline-content">
                                            <h4>{status.label}</h4>
                                            <p>{formatDate(order.timeline[statusKey])}</p>
                                            {isCurrent && (
                                                <div className="status-buttons">
                                                    {Object.keys(statusConfig).map((nextStatus) => {
                                                        const nextStatusIdx = Object.keys(statusConfig).indexOf(nextStatus);
                                                        const currentStatusIdx = Object.keys(statusConfig).indexOf(order.status);

                                                        if (nextStatusIdx === currentStatusIdx + 1) {
                                                            return (
                                                                <button
                                                                    key={nextStatus}
                                                                    onClick={() => updateStatus(order.id, nextStatus)}
                                                                >
                                                                    Mark as {statusConfig[nextStatus].label}
                                                                </button>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogisticsPage;