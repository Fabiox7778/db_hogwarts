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
        const { id } = parsetInt(req.params.id);
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