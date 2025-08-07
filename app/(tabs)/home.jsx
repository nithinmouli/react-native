import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=20');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard} 
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <TouchableOpacity style={styles.heartIcon}>
        <FontAwesome name="heart-o" size={18} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B85C5C" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Viorra</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <FontAwesome name="bell-o" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <FontAwesome name="shopping-bag" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={18} color="#999" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search for all products"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.productsHeader}>
        <View>
          <Text style={styles.sectionTitle}>Best Products</Text>
          <Text style={styles.productCount}>{products.length} products</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Apply Filter</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F8F8' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20 },
  logo: { fontSize: 24, fontWeight: 'bold', color: '#B85C5C' },
  headerIcons: { flexDirection: 'row' },
  iconBtn: { marginLeft: 20 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginHorizontal: 20, marginBottom: 20, paddingHorizontal: 15, paddingVertical: 12, borderRadius: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  productsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  productCount: { fontSize: 14, color: '#999', marginTop: 2 },
  filterBtn: { flexDirection: 'row', alignItems: 'center' },
  filterText: { fontSize: 14, color: '#333', marginRight: 5 },
  productsList: { paddingHorizontal: 20, paddingBottom: 100 },
  productCard: { flex: 1, backgroundColor: 'white', marginRight: 15, marginBottom: 20, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, position: 'relative' },
  productImage: { width: '100%', height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15, resizeMode: 'cover' },
  productTitle: { fontSize: 14, fontWeight: '500', color: '#333', margin: 12, marginBottom: 5 },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: '#333', marginHorizontal: 12, marginBottom: 12 },
  heartIcon: { position: 'absolute', top: 10, right: 10, backgroundColor: 'white', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }
});
