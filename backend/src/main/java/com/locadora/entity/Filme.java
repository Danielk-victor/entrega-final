package com.locadora.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "filmes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Filme {

    @Id
    private String id;

    @NotBlank(message = "O título é obrigatório")
    private String titulo;

    @NotBlank(message = "O gênero é obrigatório")
    private String genero;

    @NotBlank(message = "O diretor é obrigatório")
    private String diretor;

    @NotNull(message = "O ano de lançamento é obrigatório")
    private Integer anoLancamento;

    @NotNull(message = "O valor da locação é obrigatório")
    @Positive(message = "O valor da locação deve ser maior que zero")
    private Double valorLocacao;

    @NotNull(message = "É necessário informar se o filme está disponível")
    private Boolean disponivel;
}
