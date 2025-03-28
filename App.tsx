import { ReanimatedScreenProvider } from "react-native-screens/reanimated";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/navigation/AppNavigator";
import { store } from "./src/store/store";
import { Provider } from "react-redux";
import ModalComponent from "./src/views/components/ModalComponent";
import { useFonts } from "expo-font";
import Loader from "./src/views/components/Loader";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <Loader />;
  }

  return (
    <Provider store={store}>
      <ReanimatedScreenProvider>
        <NavigationContainer>
          <RootStack />
          <ModalComponent />
        </NavigationContainer>
      </ReanimatedScreenProvider>
    </Provider>
  );
}
