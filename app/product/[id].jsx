import { FontAwesome } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProduct();
  }, [id]);
  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesome key={i} name="star" size={14} color="#FFD700" />);
    }
    if (hasHalfStar) {
      stars.push(<FontAwesome key="half" name="star-half-o" size={14} color="#FFD700" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesome key={`empty-${i}`} name="star-o" size={14} color="#FFD700" />);
    }
    return stars;
  }
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B85C5C" />
      </View>
    );
  }
  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <FontAwesome name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn}>
            <FontAwesome name="bookmark-o" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
          <TouchableOpacity style={styles.viewSimilarBtn}>
            <Text style={styles.viewSimilarText}>View Similar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareIconOverlay}>
            <FontAwesome name="share" size={16} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderStars(product.rating)}
            </View>
            <Text style={styles.ratingText}>{product.rating}/5</Text>
          </View>
          <Text style={styles.brandText}>Sold by: {product.brand || 'Unknown Brand'}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>${product.price}</Text>
            <Text style={styles.originalPrice}>${(product.price * 1.2).toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.addToBagBtn}>
            <Text style={styles.addToBagText}>Add to Bag</Text>
          </TouchableOpacity>
          <View style={styles.highlightsSection}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            <View style={styles.highlightRow}>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>Width</Text>
                <Text style={styles.highlightValue}>{product.dimensions?.width || '15.14'}</Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>Height</Text>
                <Text style={styles.highlightValue}>{product.dimensions?.height || '13.08'}</Text>
              </View>
            </View>
            <View style={styles.highlightRow}>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>Warranty</Text>
                <Text style={styles.highlightValue}>{product.warrantyInformation || '1 week'}</Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>Shipping</Text>
                <Text style={styles.highlightValue}>{product.shippingInformation || 'In 3-5 business days'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Ratings & Reviews</Text> 
            {product.reviews?.slice(0, 2).map((review, index) => (
              <View key={index} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerInfo}>
                    <View style={styles.reviewerAvatar}>
                      <Text style={styles.reviewerInitial}>{review.reviewerName?.[0] || 'U'}</Text>
                    </View>
                    <View>
                      <Text style={styles.reviewerName}>{review.reviewerName || 'Anonymous'}</Text>
                      <Text style={styles.reviewerEmail}>{review.reviewerEmail || 'user@example.com'}</Text>
                    </View>
                  </View>
                  <View style={styles.reviewStars}>
                    {renderStars(review.rating)}
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  errorText: { fontSize: 18, color: '#999' },
  scrollView: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10, backgroundColor: 'white' },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  shareBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  imageContainer: { backgroundColor: '#F5F5F5', height: 400, justifyContent: 'center', alignItems: 'center', position: 'relative', marginHorizontal: 20, marginBottom: 20, borderRadius: 20 },
  productImage: { width: 280, height: 320, resizeMode: 'contain' },
  viewSimilarBtn: { position: 'absolute', bottom: 20, left: 20, backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  viewSimilarText: { fontSize: 11, color: '#666', fontWeight: '400' },
  shareIconOverlay: { position: 'absolute', top: 20, right: 20, backgroundColor: 'white', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 3 },
  productInfo: { paddingHorizontal: 20, paddingBottom: 100, backgroundColor: 'white' },
  productTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 8, lineHeight: 28 },
  productDescription: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 15 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  stars: { flexDirection: 'row', marginRight: 8 },
  ratingText: { fontSize: 14, color: '#666', marginLeft: 5 },
  brandText: { fontSize: 14, color: '#666', marginBottom: 20, fontWeight: '400' },
  priceContainer: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 30 },
  currentPrice: { fontSize: 28, fontWeight: 'bold', color: '#333', marginRight: 10 },
  originalPrice: { fontSize: 16, color: '#999', textDecorationLine: 'line-through' },
  addToBagBtn: { backgroundColor: '#C67C7C', paddingVertical: 18, borderRadius: 25, alignItems: 'center', marginBottom: 30 },
  addToBagText: { color: 'white', fontSize: 18, fontWeight: '600' },
  highlightsSection: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  highlightRow: { flexDirection: 'row', marginBottom: 15 },
  highlightItem: { flex: 1, marginRight: 40 },
  highlightLabel: { fontSize: 14, color: '#666', marginBottom: 5 },
  highlightValue: { fontSize: 14, fontWeight: '500', color: '#333' },
  reviewsSection: { marginBottom: 30 },
  reviewItem: { backgroundColor: '#F8F8F8', padding: 18, borderRadius: 12, marginBottom: 15 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  reviewerInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  reviewerAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  reviewerInitial: { fontSize: 16, fontWeight: 'bold', color: '#666' },
  reviewerName: { fontSize: 14, fontWeight: '500', color: '#333' },
  reviewerEmail: { fontSize: 12, color: '#999' },
  reviewStars: { flexDirection: 'row', alignItems: 'center', marginLeft: 10 },
  reviewComment: { fontSize: 14, color: '#666', lineHeight: 20 }
});