import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { Product, ProductContextType } from "@/types/productTypes"; // ✅ Import from the new file

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// (Rest of your ProductContext logic remains unchanged...)
