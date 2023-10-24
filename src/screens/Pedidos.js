import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import axios from "axios";

function Pedidos() {
    const [pedidos, setData] = useState([]);
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        axios.get('https://backendpedidosnow-dev-pabx.1.ie-1.fl0.io/api/pedidos/')
        .then(response => setData(response.data));
    }, []);

    const openModal = (pedido) => {
        setSelectedPedido(pedido);
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {pedidos.map((pedido, id) => (
                     <TouchableOpacity key={id} onPress={() => openModal(pedido)}>
                    <Card key={id} style={styles.card}>
                        <Card.Content>
                            <Text style={styles.mesa} variant="titleLarge"># {pedido.mesa}</Text>
                            <Text style={styles.cliente} variant="bodyLarge">Cliente: {pedido.cliente}</Text>
                            <Text style={styles.total}>Total: R$ {pedido.total.toFixed(2)}</Text>
                            <Text style={styles.status}>Status: {pedido.status}</Text>
                        </Card.Content>
                    </Card>
                    </TouchableOpacity>
                ))}
            </View>

            <Modal style={styles.modal}
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <View>
                
                    <Text style={styles.mesa} variant="titleLarge"># {selectedPedido?.mesa}</Text>
                    <Text style={styles.cliente} variant="bodyLarge">Cliente: {selectedPedido?.cliente}</Text>
                    <Text style={styles.total}>Total: R$ {selectedPedido?.total?.toFixed(2)}</Text>
                    <Text style={styles.status}>Status: {selectedPedido?.status}</Text>
                    <Text style={styles.itens}>Itens: {selectedPedido?.itens.titulo} </Text>
                    
                    {selectedPedido?.itens.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.modalItem}>
                    <Text>{item.produto.titulo} x {item.quantidade}</Text>
                    </View>
                    ))}

                    <TouchableOpacity onPress={closeModal}>
                        <Text>Fechar</Text>
                    </TouchableOpacity>
                
                </View>
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff", 
        padding: 20,
        width: '100%'
    },
    card: {
        width: "100%",
        marginBottom: 10,
        backgroundColor: "#fff", 
        borderRadius: 8, 
        elevation: 2,
    },
    mesa: {
        fontSize: 24,
        fontWeight: "bold", 
    },
    status: {
        fontSize: 18,
        color: "#d32f2f", 
    },
    cliente: {
        fontSize: 18,
    },
    total: {
        fontSize: 16,
        marginTop: 5,
    },
    modal: {
        height: "20%",
        width: "20%",
    },
});

export default Pedidos;
