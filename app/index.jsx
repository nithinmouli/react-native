import { router } from 'expo-router';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GetStarted() {
    const handleGetStarted = () => {
        router.push('/(auth)/login');
    };

    return (
        <SafeAreaView style={styles.container}>  
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={require('../assets/images/dashboard.png')}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.bottomContent}>
                    <Text style={styles.title}>Viorra</Text>
                    <Text style={styles.tagline}>Your Beauty, Delivered.</Text>
                    
                    <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.pageIndicator}>
                        <View style={[styles.dot, styles.activeDot]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D2AAA5",
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    productImage: {
        width: '90%',
        height: '100%',
    },
    bottomContent: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    title: {
        fontSize: 48,
        fontWeight: '300',
        color: 'white',
        marginBottom: 8,
        fontFamily: 'serif',
    },
    tagline: {
        fontSize: 18,
        color: 'white',
        marginBottom: 40,
        opacity: 0.9,
    },
    button: {
        backgroundColor: '#B85C5C',
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    pageIndicator: {
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    activeDot: {
        backgroundColor: 'white',
        width: 24,
    },
});
