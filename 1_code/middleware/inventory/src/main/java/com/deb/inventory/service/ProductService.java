package com.deb.inventory.service;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.deb.inventory.model.Product;
import com.deb.inventory.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository repository) {
        this.productRepository = repository;
    }

    public String saveProduct(Product product) {
        productRepository.save(product);
        return "Product added successfully";
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductByName(String name) {
        return productRepository.findByName(name);
    }

    public String updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id)
                .map(existingProduct -> {
                    existingProduct.setName(updatedProduct.getName());
                    existingProduct.setPrice(updatedProduct.getPrice());
                    existingProduct.setQuantity(updatedProduct.getQuantity());
                    productRepository.save(existingProduct);
                    return "Update is successful";
                }).orElse("Product not found");
    }

    public void deleteProductById(Long id) {
         Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    productRepository.delete(product);
    }
}
