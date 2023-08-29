import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Checkbox, Button, List } from "react-native-paper";
import produtosApi from "../api/produtos";

function Cardapio() {
  const [chawarmas, setChawarmas] = useState([]);
  const [checkedChawarmas, setCheckedChawarmas] = React.useState([]);
  function changeCheckChawarmas(i) {
    let novoChecked = [...checked];
    novoChecked[i] = !novoChecked[i];
    setCheckedChawarmas(novoChecked);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await produtosApi.buscarTodosOsProdutos();
      
      const dataChawarmas = data.filter(d => d.categoria === 'Chawarma')
      setChawarmas(dataChawarmas)
      let novoChecked = [];
      dataChawarmas.map(() => novoChecked.push(false));      
      setCheckedChawarmas(novoChecked);


    }

    fetchData();
  }, []);

  return (
    <View>
      <Text style={styles.titulo}>Cardápio</Text>
      <List.AccordionGroup>
        <List.Accordion title="Bebidas" id="1">
            <List.Item title="Item 3" />
        </List.Accordion>
        <List.Accordion title="Chawarmas" id="2">
        {chawarmas.map((chawarmas, i) => (
            <View style={styles.chawarmas}>
              <Checkbox.Item
                label={chawarmas.titulo}
                status={checkedChawarmas[i] ? "checked" : "unchecked"}
                onPress={() => {
                  changeCheckChawarmas(i);
                }}
              />
            </View>
          ))}
        </List.Accordion>        
      </List.AccordionGroup>

      <Button
        style={{ marginTop: 10, marginHorizontal: 15 }}
        buttonColor="#d32f2f"
        icon="arrow-right"
        mode="contained"
      />
    </View>
  );
}

export default Cardapio;

const styles = StyleSheet.create({
  produtos: {
    margin: 10,
  },
  titulo: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});
