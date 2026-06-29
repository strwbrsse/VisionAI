import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";

type Row = {
  id: string;
  objects: string;
  context: string;
  created_at: string;
};

export default function HistoryScreen() {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("analysis_history")
      .select("*")
      .order("created_at", { ascending: false });

    setRows((data as Row[]) || []);
  }

  return (
    <FlatList
      data={rows}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.objects}</Text>
          <Text>{item.context}</Text>
        </View>
      )}
    />
  );
}
