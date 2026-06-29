import { FlatList, Text, View } from "react-native";

export default function HistoryScreen() {
  const rows: any[] = [];

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        History
      </Text>

      <FlatList
        data={rows}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text>{item?.objects ?? "No data"}</Text>
            <Text>{item?.context ?? ""}</Text>
          </View>
        )}
      />
    </View>
  );
}
