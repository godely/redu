class FolderService < StoredContentService
  def initialize(options={})
    super options.merge(:model_class => Folder)
  end

  # Atualiza Folder.
  #
  # Retorna true caso o modelo tenha sido salvo.
  # Lança CanCan::AccessDenied caso não haja autorização
  def update(attrs)
    model.update_attributes(attrs)
  end

  protected

  def infered_quota
    if model && model.space
      model.space.course.quota || model.space.course.environment.quota
    end
  end
end
