module WorkPackages::SplitViewHelper
  def optional_work_package_split_view
    return unless params[:work_package_split_view]

    content_for :content_body_right do
      render WorkPackages::SplitViewComponent.new(id: params[:work_package_id],
                                                  tab: params[:tab],
                                                  base_route: params[:base_route] || work_packages_path)
    end
  end
end
