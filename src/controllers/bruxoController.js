import * as bruxoModel from "../models/bruxoModel.js";

export const listarTodos = async (req, res) => {
  try {
    const bruxos = await bruxoModel.encontreTodos();

    if(!bruxos || bruxos.length === 0) {
      res.status(404).json({
        mensagem: "Não há bruxos na lista.",
        bruxos
      })
    }

    res.status(200).json({
        total: bruxos.length,
        mensagem: "Lista de bruxos",
        bruxos: bruxos
    })

  } catch (error) {
    res.status(500).json({
        error: "Erro interno do servidor.",
        details: error.message,
        status: 500
    });
  }
}

export const listarUm = async (req, res) => {
    try {
        const id = req.params.id;
        const bruxo = await bruxoModel.encontreUm(id);

        if(!bruxo) {
            res.status(404).json({
                erro:'Bruxo não encontrado.',
                mensagem: `verifique o id do bruxo.`,
                id: id
            });
        }

        res.status(200).json({
            mensagem: "Bruxo encontrado com sucesso.",
            bruxo
        });
        
    } catch (error) {
        res.status(500).json({
            error: "Erro interno do servidor.",
            details: error.message,
            status: 500
        });
    }
}

export const criar = async (req, res) => {
  try {
    const { name, casa, patrono, varinha, anoMatricula } = req.body;

    const dado = { name, casa, patrono, varinha, anoMatricula }

    // Validação
    const camposObrigatorios = ['name', 'casa', 'varinha', 'anoMatricula'];
    
    const faltando = camposObrigatorios.filter(campo => !dado[campo]);

    if (faltando.length > 0) {
      return res.status(400).json({
        erro: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}.`
      });
    }

    // Validar se a casa é válida
    const casasValidas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
    if (!casasValidas.includes(casa)) {
      return res.status(400).json({
        erro: 'Casa inválida! O Chapéu Seletor só reconhece as 4 casas',
        casasValidas
      });
    }

    // Eu crio o bruxo usando o Model
    const novoBruxo = await bruxoModel.criar(req.body)

    res.status(201).json({
      mensagem: 'Bruxo criado com sucesso!',
      bruxo: novoBruxo
    })

  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao criar bruxo',
      detalhes: error.message
    })
  }
}

export const deletar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    //Verificar se o id existe, ou seja se tem bruxo com esse id
    const bruxoExiste = await bruxoModel.encontreUm(id);

    if (!bruxoExiste) {
      return res.status(404).json({
        erro: 'Bruxo não encontrado com esse id',
        id: id
      })
    }

    await bruxoModel.deletar(id);

    res.status(200).json({
      mensagem: 'Bruxo apagado com sucesso!',
      bruxoRemovido: bruxoExiste
    })

  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao apagar bruxo!',
      detalhes: error.message
    })
  }
}

export const atualizar = async (req, res) => { 
  try {
    const id = parseInt(req.params.id);
    const dado = req.body;

    const bruxoExiste = await bruxoModel.encontreUm(id);

    if (!bruxoExiste) {
      return res.status(404).json({
        erro: 'Bruxo com esse id não foi encontrado',
        id: id
      })
    }

    if (dado.casa) {
      const casasValidas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
      if (!casasValidas.includes(dado.casa)) {
        return res.status(400).json({
          erro: 'Casa inválida! O Chapéu Seletor só reconhece as 4 casas',
          casasValidas
        });
      }
    } 

    const bruxoAtualizado = await bruxoModel.atualizar(id, dado);

    res.status(200).json({
      mensagem: 'Bruxo atualizado com sucesso!',
      bruxo: bruxoAtualizado
    })

  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao atualizar bruxo',
      detalhes: error.message
    })
  }
}