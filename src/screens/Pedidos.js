import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import axios from "axios";

function Pedidos() {
    const [pedidos, setData] = useState([]);

    useEffect(() => {
        axios.get('http://10.0.0.122:19002/api/pedidos/')
        .then(response => setData(response.data));
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                {pedidos.map((pedido, id) => (
                    <Card key={id} style={styles.card}>
                        <Card.Content>
                            <Text style={styles.mesa} variant="titleLarge"># {pedido.mesa}</Text>
                            <Text style={styles.cliente} variant="bodyLarge">Cliente: {pedido.cliente}</Text>
                            <Text style={styles.total}>Total: R$ {pedido.total.toFixed(2)}</Text>
                            <Text style={styles.status}>Status: {pedido.status}</Text>
                        </Card.Content>
                    </Card>
                ))}
            </View>
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
});

export default Pedidos;
