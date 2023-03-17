package kz.runtime.backfor_mega.serivce;

import kz.runtime.backfor_mega.entity.Wallet;

import java.util.List;

public interface WalletService {
    void save(Wallet wallet);
    void delete(Wallet wallet);

    Wallet findByNameWallet(String nameWallet);
    List<Wallet> findAllById(Long id);
}