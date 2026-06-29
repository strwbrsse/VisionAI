import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function TaskItem({ item, onToggle, onDelete }) {
  return (
    <TouchableOpacity
      style={[styles.taskCard, item.completed && styles.taskCardDone]}
      onPress={() => onToggle(item)}
    >
      {/* Checkbox */}
      <MaterialIcons
        name={item.completed ? "check-box" : "check-box-outline-blank"}
        size={24}
        color={item.completed ? "#22C55E" : "#6B7280"}
      />

      {/* Title */}
      <Text style={[styles.taskText, item.completed && styles.taskTextDone]}>
        {item.title}
      </Text>

      {/* TRASH BUTTON */}
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <MaterialIcons name="delete" size={22} color="#EF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  taskCardDone: {
    backgroundColor: "#F0FDF4",
  },

  taskText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },

  taskTextDone: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
});
